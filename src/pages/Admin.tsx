import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, GiftFormData } from '@/types/gift';
import { supabase } from '@/lib/supabase';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Confirmation } from '@/types/confirmation';

interface Guest {
  name: string;
  type: 'adult' | 'child';
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newGift, setNewGift] = useState<GiftFormData>({
    name: '',
    image_url: '',
    price: 0
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchConfirmations();
      fetchGifts();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const fetchConfirmations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('confirmations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setConfirmations(data || []);
      
      // Calculando totais
      let adults = 0;
      let children = 0;
      
      data?.forEach(confirmation => {
        confirmation.guests.forEach(guest => {
          if (guest.type === 'adult') {
            adults++;
          } else {
            children++;
          }
        });
      });
      
      setTotalAdults(adults);
      setTotalChildren(children);
      setTotalGuests(adults + children);
    } catch (error) {
      console.error('Erro ao buscar confirmações:', error);
      alert('Erro ao carregar as confirmações. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setGifts(data || []);
    } catch (error) {
      console.error('Erro ao carregar presentes:', error);
      alert('Erro ao carregar a lista de presentes. Por favor, tente novamente.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    if (!newGift.name || !newGift.price) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setIsUploading(true);
    try {
      console.log('Iniciando upload da imagem...');
      
      // Upload da imagem
      const fileExt = selectedImage.name.split('.').pop()?.toLowerCase();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log('Nome do arquivo:', fileName);
      console.log('Tamanho do arquivo:', selectedImage.size, 'bytes');
      console.log('Tipo do arquivo:', selectedImage.type);
      
      // Verificar se o bucket existe
      const { data: buckets } = await supabase.storage.listBuckets();
      console.log('Buckets disponíveis:', buckets);
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('gift-images')
        .upload(fileName, selectedImage, {
          cacheControl: '3600',
          upsert: false,
          contentType: selectedImage.type
        });

      if (uploadError) {
        console.error('Erro detalhado do upload:', uploadError);
        console.error('Mensagem de erro:', uploadError.message);
        console.error('Detalhes do erro:', uploadError.details);
        throw new Error(`Erro ao fazer upload da imagem: ${uploadError.message}`);
      }

      console.log('Upload concluído:', uploadData);

      // Obter URL pública da imagem
      const { data: { publicUrl } } = supabase.storage
        .from('gift-images')
        .getPublicUrl(fileName);

      console.log('URL pública:', publicUrl);

      // Salvar presente no banco
      const { error: insertError } = await supabase.from('gifts').insert([{
        name: newGift.name,
        image_url: publicUrl,
        price: newGift.price,
        created_at: new Date().toISOString(),
        paid: false,
        reserved_by: null
      }]);

      if (insertError) {
        console.error('Erro ao inserir no banco:', insertError);
        throw new Error(`Erro ao salvar o presente no banco de dados: ${insertError.message}`);
      }

      // Limpar formulário e atualizar lista
      setNewGift({ name: '', image_url: '', price: 0 });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchGifts();
      alert('Presente adicionado com sucesso!');
    } catch (error) {
      console.error('Erro completo:', error);
      alert(error instanceof Error ? error.message : 'Erro ao adicionar presente. Por favor, tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteGift = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este presente?')) return;

    try {
      const { error } = await supabase
        .from('gifts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchGifts();
      alert('Presente excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir presente:', error);
      alert('Erro ao excluir presente. Por favor, tente novamente.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-6 w-full max-w-md">
          <h1 className="text-2xl font-serif text-wedding-dark-green text-center mb-6">
            Área Administrativa
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="confirmations">
          <TabsList className="mb-6">
            <TabsTrigger value="confirmations">Confirmações</TabsTrigger>
            <TabsTrigger value="gifts">Lista de Presentes</TabsTrigger>
          </TabsList>

          <TabsContent value="confirmations">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-serif text-wedding-dark-green">
                Confirmações de Presença
              </h1>
              <div className="text-right">
                <div className="bg-white rounded-lg p-4 shadow">
                  <h2 className="text-lg font-medium text-wedding-dark-green mb-2">
                    Total de Confirmados
                  </h2>
                  <div className="space-y-2">
                    <p className="text-wedding-dark-gray">
                      Adultos: <span className="font-medium">{totalAdults}</span>
                    </p>
                    <p className="text-wedding-dark-gray">
                      Crianças: <span className="font-medium">{totalChildren}</span>
                    </p>
                    <div className="border-t pt-2 mt-2">
                      <p className="text-lg font-medium text-wedding-dark-green">
                        Total: {totalGuests}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={fetchConfirmations}
                    variant="outline"
                    className="mt-4 w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Atualizando...' : 'Atualizar lista'}
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">Carregando confirmações...</div>
            ) : (
              <div className="space-y-4">
                {confirmations.length === 0 ? (
                  <Card className="p-4 text-center text-wedding-dark-gray">
                    Nenhuma confirmação ainda.
                  </Card>
                ) : (
                  confirmations.map((confirmation) => (
                    <Card key={confirmation.id} className="p-4">
                      <div className="mb-2">
                        <p className="text-sm text-wedding-dark-gray/70">
                          Confirmado em: {new Date(confirmation.created_at).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {confirmation.guests.map((guest, index) => (
                          <div key={index} className="p-2 bg-gray-50 rounded">
                            <p className="font-medium">{guest.name}</p>
                            <div className="text-sm text-wedding-dark-gray">
                              <p>Tipo: {guest.type === 'adult' ? 'Adulto' : 'Criança (até 10 anos)'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="gifts">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-serif text-wedding-dark-green mb-4">
                  Adicionar Novo Presente
                </h2>
                <form onSubmit={handleAddGift} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome do Presente</label>
                    <Input
                      value={newGift.name}
                      onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                      required
                      placeholder="Ex: Jogo de Panelas"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Imagem</label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={handleImageClick}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        {selectedImage ? 'Trocar Imagem' : 'Escolher Imagem'}
                      </Button>
                      {selectedImage && (
                        <span className="text-sm text-gray-600">
                          {selectedImage.name}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Preço</label>
                    <Input
                      type="text"
                      value={newGift.price === 0 ? '' : newGift.price.toString().replace('.', ',')}
                      onChange={(e) => {
                        const value = e.target.value.replace(',', '.');
                        const numericValue = value === '' ? 0 : parseFloat(value);
                        if (!isNaN(numericValue)) {
                          setNewGift({ ...newGift, price: numericValue });
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value.replace(',', '.'));
                        if (!isNaN(value)) {
                          const formattedValue = new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(value);
                          e.target.value = formattedValue;
                        }
                      }}
                      required
                      placeholder="0,00"
                      inputMode="decimal"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Adicionando...' : 'Adicionar Presente'}
                  </Button>
                </form>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gifts.map((gift) => (
                  <Card key={gift.id} className="overflow-hidden flex flex-col">
                    <img
                      src={gift.image_url}
                      alt={gift.name}
                      className="w-full h-64 object-contain bg-gray-50 p-4"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-medium text-lg mb-2">{gift.name}</h3>
                      <p className="text-wedding-dark-green font-semibold mb-4">
                        {formatPrice(gift.price)}
                      </p>
                      {gift.reserved_by && (
                        <p className="text-wedding-dark-gray text-sm mb-4">
                          Reservado por: {gift.reserved_by}
                        </p>
                      )}
                      <Button
                        onClick={() => handleDeleteGift(gift.id)}
                        variant="destructive"
                        className="w-full mt-auto"
                      >
                        Excluir
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin; 
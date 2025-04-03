import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Gift } from '@/types/gift';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import QRCodePix from '@/assets/qr-code-pix.jpg';

const GiftList = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [reservationName, setReservationName] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const handleReserveGift = async () => {
    if (!selectedGift || !reservationName) return;
    
    setIsReserving(true);
    try {
      const { error } = await supabase
        .from('gifts')
        .update({
          reserved_by: reservationName,
        })
        .eq('id', selectedGift.id);

      if (error) throw error;
      
      setShowQRCode(true);
      await fetchGifts();
    } catch (error) {
      console.error('Erro ao reservar presente:', error);
      alert('Erro ao reservar o presente. Por favor, tente novamente.');
    } finally {
      setIsReserving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-wedding-dark-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-wedding-dark-green text-center mb-8">
          Lista de Presentes
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => (
            <Card key={gift.id} className="overflow-hidden">
              <img
                src={gift.image_url}
                alt={gift.name}
                className="w-full h-64 object-contain bg-gray-50 p-4"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{gift.name}</h3>
                <p className="text-wedding-dark-green font-semibold mb-4">
                  {formatPrice(gift.price)}
                </p>
                {gift.reserved_by ? (
                  <p className="text-wedding-dark-gray text-sm">
                    Reservado por: {gift.reserved_by}
                  </p>
                ) : (
                  <Button
                    onClick={() => setSelectedGift(gift)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Presentear
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedGift && !showQRCode} onOpenChange={() => {
          setSelectedGift(null);
          setReservationName('');
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reservar Presente</DialogTitle>
              <DialogDescription>
                Digite seu nome para reservar {selectedGift?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Seu nome completo"
                value={reservationName}
                onChange={(e) => setReservationName(e.target.value)}
              />
              <Button
                onClick={handleReserveGift}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!reservationName || isReserving}
              >
                {isReserving ? 'Reservando...' : 'Confirmar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showQRCode} onOpenChange={() => {
          setShowQRCode(false);
          setSelectedGift(null);
          setReservationName('');
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pagamento via PIX</DialogTitle>
              <DialogDescription>
                Escaneie o QR Code abaixo para fazer o pagamento de {selectedGift ? formatPrice(selectedGift.price) : ''}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <img
                  src={QRCodePix}
                  alt="QR Code PIX"
                  className="w-64 h-64"
                  onError={(e) => {
                    console.error('Erro ao carregar QR code:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => console.log('QR code carregado com sucesso')}
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-wedding-dark-gray">
                  Após o pagamento, os noivos serão notificados automaticamente.
                </p>
                <p className="font-medium text-lg">
                  Valor: {selectedGift ? formatPrice(selectedGift.price) : ''}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GiftList; 
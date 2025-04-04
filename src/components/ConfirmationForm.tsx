import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabase';

interface Guest {
  name: string;
  type: 'adult' | 'child';
}

const ConfirmationForm = () => {
  const [guests, setGuests] = useState<Guest[]>([{ name: '', type: 'adult' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleAddGuest = () => {
    setGuests([...guests, { name: '', type: 'adult' }]);
  };

  const handleGuestChange = (index: number, field: keyof Guest, value: string | 'adult' | 'child') => {
    const newGuests = [...guests];
    if (field === 'type') {
      newGuests[index][field] = value as 'adult' | 'child';
    } else {
      newGuests[index][field] = value as string;
    }
    setGuests(newGuests);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('confirmations')
        .insert([
          {
            guests,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;
      
      alert('Presença confirmada com sucesso! Obrigado por confirmar.');
      navigate('/');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao confirmar presença. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-serif text-wedding-dark-green text-center mb-6">
          Confirmar Presença
        </h2>
        
        {guests.map((guest, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium">Convidado {index + 1}</h3>
            
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Nome</Label>
              <Input
                id={`name-${index}`}
                value={guest.name}
                onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                required
                placeholder="Digite o nome completo"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Convidado</Label>
              <Select
                value={guest.type}
                onValueChange={(value) => handleGuestChange(index, 'type', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Adulto</SelectItem>
                  <SelectItem value="child">Criança (até 10 anos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        
        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            onClick={handleAddGuest}
            variant="outline"
            className="bg-wedding-light-green hover:bg-wedding-light-green/90"
            disabled={isSubmitting}
          >
            Adicionar Convidado
          </Button>
          
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Confirmando...' : 'Confirmar Presença'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ConfirmationForm; 
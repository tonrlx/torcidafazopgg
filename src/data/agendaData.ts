import { AgendaEvent } from '../types';

// Função para gerar datas futuras
const getFutureDate = (daysFromNow: number): string => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + daysFromNow * 24 * 60 * 60 * 1000);
  return futureDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const agendaData: AgendaEvent[] = [
  // Dados serão preenchidos via scraping real
];
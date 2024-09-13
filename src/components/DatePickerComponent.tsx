// DatePickerComponent.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale'; // Importando o locale para português

interface DatePickerComponentProps {
    selectedDate: Date;
    onChangeDate: (date: Date) => void;
  }

  const CustomDatePicker: React.FC<DatePickerComponentProps> = ({ selectedDate, onChangeDate }) => {
    return (
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => date && onChangeDate(date)}
          dateFormat="dd/MM/yyyy"
          locale={ptBR} // Configurando o idioma
        />
      </div>
    );
  };
  
  export default CustomDatePicker;
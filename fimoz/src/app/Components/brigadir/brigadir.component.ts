import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brigadir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brigadir.component.html',
  styleUrl: './brigadir.component.scss'
})
export class BrigadirComponent {
  activeSection: string = '';

  // Данные для селекторов
  operators = ['Оператор 1', 'Оператор 2', 'Оператор 3'];
  tasks = ['Задача 1', 'Задача 2', 'Задача 3'];
  equipment = ['Техника 1', 'Техника 2', 'Техника 3'];

  // Выбранные элементы
  selectedOperator: string | null = null;
  selectedTask: string | null = null;
  selectedEquipment: string | null = null;

  // Метод для показа секции
  showSection(section: string): void {
    this.activeSection = section;
    this.resetSelections();
  }

  // Сброс всех выборов
  private resetSelections(): void {
    this.selectedOperator = null;
    this.selectedTask = null;
    this.selectedEquipment = null;
  }
}

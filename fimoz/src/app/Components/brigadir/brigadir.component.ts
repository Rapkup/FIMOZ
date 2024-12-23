import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brigadir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brigadir.component.html',
  styleUrls: ['./brigadir.component.scss']
})
export class BrigadirComponent {
  activeSection: string = '';

  // Данные для селекторов
  operators = ['Анна Смирнова', 'Игорь Иванов', 'Марина Кузнецова', 'Алексей Петров', 'Светлана Васильева'];
  tasks = [
    { name: 'Задача 1', season: 'Весна', equipment: 'Техника 1', field: 'Поле 1', description: 'Описание задачи 1', personnel: 'Анна Смирнова', startDate: new Date(), endDate: new Date() },
    { name: 'Задача 2', season: 'Лето', equipment: 'Техника 2', field: 'Поле 2', description: 'Описание задачи 2', personnel: 'Игорь Иванов', startDate: new Date(), endDate: new Date() },
    { name: 'Задача 3', season: 'Осень', equipment: 'Техника 3', field: 'Поле 3', description: 'Описание задачи 3', personnel: 'Марина Кузнецова', startDate: new Date(), endDate: new Date() }
  ];


  // Добавление поля исправности для техники
  equipment = [
    { name: 'Техника 1', isFunctional: true },
    { name: 'Техника 2', isFunctional: true },
    { name: 'Техника 3', isFunctional: true }
  ];

  // Выбранные элементы
  selectedOperator: string | null = null;
  selectedTask: string | null = null;
  selectedEquipment: any | null = null; // Теперь храним выбранную технику с её состоянием

  // Флаг для отображения задач работников
  showTasks: boolean = false;  // Скрыто до нажатия кнопки
  tasksList: any[] = [];  // Сюда будут загружаться задачи
  selectedTaskDetails: any | null = null;

  // Метод для показа секции
  showSection(section: string): void {
    this.activeSection = section;
    this.resetSelections();
    if (section === 'distribution') {
      this.showTasks = true;
      this.tasksList = [...this.tasks];  // Задачи уже загружены и видны
    }
  }
  

  // Метод для назначения задачи
  onAssignTask(): void {
    if (this.selectedOperator && this.selectedTask) {
      console.log(`Выбран оператор: ${this.selectedOperator}`);
      console.log(`Выбрана задача: ${this.selectedTask}`);

      // Находим задачу, которая соответствует выбранной задаче
      const taskIndex = this.tasks.findIndex(task => task.name === this.selectedTask);
      
      if (taskIndex !== -1) {
        // Обновляем выбранную задачу с новым ответственным
        this.tasks[taskIndex].personnel = this.selectedOperator;
        
        // Логируем результаты
        console.log('Обновленные задачи:', this.tasks);
      }
    }
  }

  // Метод для выбора задачи и отображения её подробностей
  onSelectTaskForDetails(): void {
    if (this.selectedTask) {
      this.selectedTaskDetails = this.tasks.find(task => task.name === this.selectedTask) || null;
      console.log('Выбранная задача для подробностей:', this.selectedTaskDetails);
    }
  }

  // Метод для изменения состояния исправности техники
  changeEquipmentStatus(isFunctional: boolean): void {
    if (this.selectedEquipment) {
      this.selectedEquipment.isFunctional = isFunctional;
      console.log(`Техника ${this.selectedEquipment.name} теперь ${isFunctional ? 'исправна' : 'неисправна'}`);
    }
  }

  // Метод для сброса всех выборов
  private resetSelections(): void {
    this.selectedOperator = null;
    this.selectedTask = null;
    this.selectedEquipment = null;
    this.showTasks = false;  // Скрыть панель с задачами
    this.selectedTaskDetails = null;  // Очистить подробности задачи
  }

  logout(): void {
    // Логика для выхода
  }
}

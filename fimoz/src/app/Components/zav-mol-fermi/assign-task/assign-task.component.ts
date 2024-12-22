import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Worker {
  id: number;
  name: string;
  category: string;
  status: string; // Добавлен статус
}

interface Animal {
  id: number;
  name: string;
  status: string; // Добавлен статус
}

interface MilkingMachine {
  id: number;
  name: string;
  status: string; // Добавлен статус
}

interface Task {
  worker: Worker;
  animal: Animal;
  milkingMachine: MilkingMachine;
  status: string;
}

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent {
  @Input() availableAnimals: Animal[] = []; // Список животных
  @Input() availableMilkingMachines: MilkingMachine[] = []; // Список доильных установок
  @Input() isOpen: boolean = false; // Флаг для открытия/закрытия модального окна
  @Input() selectedWorker: Worker | null = null; // Выбранный сотрудник

  @Output() taskAssigned = new EventEmitter<Task>(); // Событие для отправки задачи
  @Output() modalClosed = new EventEmitter<void>(); // Событие для закрытия модального окна

  selectedAnimal: Animal | null = null;
  selectedMilkingMachine: MilkingMachine | null = null;

  notification: string = '';

  onWorkerChange(): void {
    // Очищаем выбранные животное и доильную установку при смене сотрудника
    this.selectedAnimal = null;
    this.selectedMilkingMachine = null;
  }

  assignTask(): void {
    if (this.selectedWorker && this.selectedAnimal && this.selectedMilkingMachine) {
      const newTask: Task = {
        worker: this.selectedWorker,
        animal: this.selectedAnimal,
        milkingMachine: this.selectedMilkingMachine,
        status: 'В процессе',
      };

      this.taskAssigned.emit(newTask); // Отправляем задачу в родительский компонент

      this.notification = 'Задача назначена';
      setTimeout(() => {
        this.notification = '';
      }, 4000);

      // Очищаем форму
      this.selectedAnimal = null;
      this.selectedMilkingMachine = null;

      // Закрываем модальное окно
      this.closeModal();
    } else {
      this.notification = 'Пожалуйста, выберите сотрудника, животное и доильную установку';
      setTimeout(() => {
        this.notification = '';
      }, 4000);
    }
  }

  closeModal(): void {
    this.modalClosed.emit(); // Отправляем событие о закрытии модального окна
  }
}
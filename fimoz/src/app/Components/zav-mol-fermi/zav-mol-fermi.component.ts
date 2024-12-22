import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignTaskComponent } from './assign-task/assign-task.component';

interface Worker {
  id: number;
  name: string;
  category: string;
}

interface Animal {
  id: number;
  name: string;
  status: string;
}

interface MilkingMachine {
  id: number;
  name: string;
  status: string;
}

interface Task {
  worker: Worker;
  animal: Animal;
  milkingMachine: MilkingMachine;
  status: string;
}

@Component({
  selector: 'app-zav-mol-fermi',
  standalone: true,
  imports: [CommonModule, FormsModule, AssignTaskComponent],
  templateUrl: './zav-mol-fermi.component.html',
  styleUrls: ['./zav-mol-fermi.component.scss']
})
export class ZavMolFermiComponent {
  workers: Worker[] = [
    { id: 1, name: 'Иван Иванов', category: 'Категория B' },
    { id: 2, name: 'Петр Петров', category: 'Категория C' },
    { id: 3, name: 'Анна Сергеева', category: 'Категория B' },
    { id: 4, name: 'Мария Васильева', category: 'Категория D' },
  ];

  availableAnimals: Animal[] = [
    { id: 1, name: 'Корова 1', status: 'Свободно' },
    { id: 2, name: 'Корова 2', status: 'Свободно' },
    { id: 3, name: 'Корова 3', status: 'Свободно' },
  ];

  availableMilkingMachines: MilkingMachine[] = [
    { id: 1, name: 'Доильная установка 1', status: 'Свободно' },
    { id: 2, name: 'Доильная установка 2', status: 'Свободно' },
    { id: 3, name: 'Доильная установка 3', status: 'Свободно' },
  ];

  workerTasks: Task[] = [];
  notification: string = '';
  activeSection: string = 'workers';
  isAssignTaskModalOpen: boolean = false;

  selectedWorker: Worker | null = null;

  logout() {
    console.log('Выход из аккаунта');
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker;
    this.isAssignTaskModalOpen = true; // Открываем модальное окно
  }

  closeAssignTaskModal(): void {
    this.isAssignTaskModalOpen = false;
  }

  onTaskAssigned(task: Task): void {
    this.workerTasks.push(task);
    this.notification = 'Задача назначена';
    setTimeout(() => {
      this.notification = '';
    }, 4000);
  }

  showSection(section: string): void {
    this.activeSection = section;
  }
}
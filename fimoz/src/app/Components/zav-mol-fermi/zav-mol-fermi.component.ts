import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignTaskComponent } from './assign-task/assign-task.component';

interface Worker {
  id: number;
  name: string;
  category: string;
  status: string; // Добавляем статус
}

interface Animal {
  id: number;
  name: string;
  status: string; // Добавляем статус
}

interface MilkingMachine {
  id: number;
  name: string;
  status: string; // Добавляем статус
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
    { id: 1, name: 'Иван Иванов', category: 'Категория B', status: 'available' },
    { id: 2, name: 'Петр Петров', category: 'Категория C', status: 'available' },
    { id: 3, name: 'Анна Сергеева', category: 'Категория B', status: 'available' },
    { id: 4, name: 'Мария Васильева', category: 'Категория D', status: 'available' },
  ];
  
  animals: Animal[] = [
    { id: 1, name: 'Корова 1', status: 'available' },
    { id: 2, name: 'Корова 2', status: 'available' },
    { id: 3, name: 'Корова 3', status: 'available' },
  ];
  
  milkingMachines: MilkingMachine[] = [
    { id: 1, name: 'Доильная установка 1', status: 'available' },
    { id: 2, name: 'Доильная установка 2', status: 'available' },
    { id: 3, name: 'Доильная установка 3', status: 'available' },
  ];

  workerTasks: Task[] = [];
  notification: string = '';
  activeSection: string = 'workers';
  isAssignTaskModalOpen: boolean = false;

  selectedWorker: Worker | null = null;

  get availableWorkers(): Worker[] {
  return this.workers.filter(worker => worker.status === 'available');
}

get availableAnimals(): Animal[] {
  return this.animals.filter(animal => animal.status === 'available');
}

get availableMilkingMachines(): MilkingMachine[] {
  return this.milkingMachines.filter(machine => machine.status === 'available');
}

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
    // Добавляем задачу в список
    this.workerTasks.push(task);
  
    // Обновляем статусы работника, животного и доильной машины
    task.worker.status = 'busy';
    task.animal.status = 'busy';
    task.milkingMachine.status = 'busy';
    task.status = 'in process';
  
    // Обновляем статус животного в массиве animals
    this.animals = this.animals.map(animal => {
      if (animal.id === task.animal.id) {
        return { ...animal, status: 'busy' }; // Создаем новый объект с обновленным статусом
      }
      return animal;
    });
  
    // Обновляем статус доильной машины в массиве milkingMachines
    this.milkingMachines = this.milkingMachines.map(machine => {
      if (machine.id === task.milkingMachine.id) {
        return { ...machine, status: 'busy' }; // Создаем новый объект с обновленным статусом
      }
      return machine;
    });
  
    // Уведомление
    this.notification = 'Задача назначена';
    setTimeout(() => {
      this.notification = '';
    }, 4000);
  }

  showSection(section: string): void {
    this.activeSection = section;
  }
}
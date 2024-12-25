import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Worker {
  id: number;
  name: string;
  category: string;
  status: string;
}

interface Animal {
  id: number;
  name: string;
  status: string;
}

interface MilkingMachine {
  id: number;
  name: string;
  status: string; // Доступность: "available" или "not available"
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
  imports: [CommonModule, FormsModule],
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
    { id: 4, name: 'Доильная установка 4', status: 'available' },
    { id: 5, name: 'Доильная установка 5', status: 'available' },
  ];

  workerTasks: Task[] = [];
  notification: string = '';
  errorNotification: string = '';
  activeSection: string = 'workers';
  selectedWorker: Worker | null = null;
  selectedAnimal: Animal | null = null;
  selectedMilkingMachine: MilkingMachine | null = null;
  taskModalOpen: boolean = false;

  constructor(private router: Router) {}

  get availableWorkers(): Worker[] {
    return this.workers.filter(worker => worker.status === 'available');
  }

  get availableAnimals(): Animal[] {
    return this.animals.filter(animal => animal.status === 'available');
  }

  get availableMilkingMachines(): MilkingMachine[] {
    return this.milkingMachines.filter(machine => machine.status === 'available');
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker;
    this.selectedAnimal = null;
    this.selectedMilkingMachine = null;
    this.taskModalOpen = true; // Открываем модальное окно для назначения задачи
  }

  assignTask(): void {
    if (this.selectedWorker && this.selectedAnimal && this.selectedMilkingMachine) {
      const newTask: Task = {
        worker: this.selectedWorker,
        animal: this.selectedAnimal,
        milkingMachine: this.selectedMilkingMachine,
        status: 'in process',
      };

      // Обновляем статусы
      this.selectedWorker.status = 'busy';
      this.selectedAnimal.status = 'busy';
      this.selectedMilkingMachine.status = 'not available'; // Если доильная установка выбрана, она становится недоступной

      // Добавляем задачу в список
      this.workerTasks.push(newTask);

      // Уведомление
      this.notification = 'Задача назначена';
      setTimeout(() => {
        this.notification = '';
      }, 4000);

      // Сбрасываем выбранные значения и закрываем модальное окно
      this.resetSelections();
      this.taskModalOpen = false;
    } else {
      this.errorNotification = 'Пожалуйста, выберите животное и доильную установку';
      setTimeout(() => {
        this.errorNotification = '';
      }, 4000);
    }
  }

  resetSelections(): void {
    this.selectedWorker = null;
    this.selectedAnimal = null;
    this.selectedMilkingMachine = null;
  }

  changeMilkingMachineStatus(status: string, machine: MilkingMachine): void {
    machine.status = status;
  }

  showSection(section: string): void {
    this.activeSection = section;
    this.resetSelections();
  }
}

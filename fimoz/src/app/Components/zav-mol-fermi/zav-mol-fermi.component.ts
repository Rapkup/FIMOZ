import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  status: string;
}

interface Task {
  worker: Worker;
  animal: Animal;
  milkingMachine: MilkingMachine;
  status: string;
}

interface Equipment {
  id: number;
  name: string;
  isFunctional: boolean;
}

interface Report {
  id: number;
  name: string;
  details: {
    workers: string[];
    machines: string[];
    equipment: string[];
    summary: string;
  };
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
  ];

  equipment: Equipment[] = [
    { id: 1, name: 'Танк для молока', isFunctional: true },
    { id: 2, name: 'Насос для молока', isFunctional: false },
    { id: 3, name: 'Комплект для упаковки', isFunctional: true },
  ];

  workerTasks: Task[] = [];
  notification: string = '';
  errorNotification: string = '';
  activeSection: string = 'workers';
  selectedWorker: Worker | null = null;
  selectedAnimal: Animal | null = null;
  selectedMilkingMachine: MilkingMachine | null = null;
  selectedEquipment: Equipment | null = null;
  selectedReport: Report | null = null; // Выбранный отчет

  // Данные для отчетов
  reports: Report[] = [
    {
      id: 1,
      name: 'Отчет за октябрь 2023',
      details: {
        workers: ['Иван Иванов', 'Анна Сергеева'],
        machines: ['Доильная установка 1', 'Доильная установка 2'],
        equipment: ['Танк для молока', 'Комплект для упаковки'],
        summary: 'Произведено 1000 литров молока. Все оборудование исправно.'
      }
    },
    {
      id: 2,
      name: 'Отчет за сентябрь 2023',
      details: {
        workers: ['Петр Петров', 'Мария Васильева'],
        machines: ['Доильная установка 3'],
        equipment: ['Танк для молока', 'Насос для молока'],
        summary: 'Произведено 950 литров молока. Насос для молока неисправен.'
      }
    },
    {
      id: 3,
      name: 'Отчет за август 2023',
      details: {
        workers: ['Иван Иванов', 'Мария Васильева'],
        machines: ['Доильная установка 1', 'Доильная установка 3'],
        equipment: ['Танк для молока', 'Комплект для упаковки'],
        summary: 'Произведено 1100 литров молока. Все оборудование исправно.'
      }
    }
  ];

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
    console.log('Выход из аккаунта');
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker;
    this.selectedAnimal = null;
    this.selectedMilkingMachine = null;
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
      this.selectedMilkingMachine.status = 'busy';

      // Добавляем задачу в список
      this.workerTasks.push(newTask);

      // Уведомление
      this.notification = 'Задача назначена';
      setTimeout(() => {
        this.notification = '';
      }, 4000);

      // Сбрасываем выбранные значения
      this.resetSelections();
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
    this.selectedEquipment = null;
    this.selectedReport = null; // Сбрасываем выбранный отчет
  }

  showSection(section: string): void {
    this.activeSection = section;
    this.resetSelections();
  }

  
  changeEquipmentStatus(isFunctional: boolean): void {
    if (this.selectedEquipment) {
      this.selectedEquipment.isFunctional = isFunctional;
      console.log(`Оборудование ${this.selectedEquipment.name} теперь ${isFunctional ? 'исправно' : 'неисправно'}`);
    }
  }

  // Метод для выбора отчета
  selectReport(report: Report): void {
    this.selectedReport = report;
  }
}
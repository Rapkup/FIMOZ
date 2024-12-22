import { Component } from '@angular/core';
import { Task } from '../../types/task';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-agranom-page',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './agranom-page.component.html',
  styleUrl: './agranom-page.component.scss'
})
export class AgranomPageComponent {
  task: Task = {
    season: 'Выбор сезона',
    equipment: 'Выбор техники',
    field: 'Выбор поля',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    personnel: 'Добавление персонала'
  };

  tasks: Task[] = []; // Массив для хранения всех задач
  notification: string = '';
  showTasks: boolean = false; // Переменная для отображения списка задач

  constructor(private router: Router) {}

  logout() {
    // Логика для выхода из аккаунта
    this.router.navigate(['/login']);
  }

  plane(): void {
    // Добавление задачи в список
    this.tasks.push({...this.task});

    // Очистка всех полей
    this.task = {
      season: 'Выбор сезона',
      equipment: 'Выбор техники',
      field: 'Выбор поля',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
      personnel: 'Добавление персонала'
    };

    this.notification = 'Задача добавлена';

    setTimeout(() => {
      this.notification = '';
    }, 4000);
  }

  toggleTasks(): void {
    this.showTasks = !this.showTasks; // Переключение видимости списка задач
  }
}

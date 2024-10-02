import { Component } from '@angular/core';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrl: './bmi.component.css'
})
export class BmiComponent {
  height: string = '';
  weight: string = '';
  Result: number | null = null;
  BmiResult: string = '';

  // BMI hesaplama fonksiyonu
  calculateBMI() {
    const heightInMeters = parseFloat(this.height) / 100;
    const weightInKg = parseFloat(this.weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      this.Result = parseFloat((weightInKg / (heightInMeters * heightInMeters)).toFixed(2));
      this.setBmiResult();
    }
  }

  // BMI sonucuna göre durumu belirleme
  setBmiResult() {
    if (this.Result! < 18.5) {
      this.BmiResult = 'Under Weight';
    } else if (this.Result! >= 18.5 && this.Result! < 25) {
      this.BmiResult = 'Normal Weight';
    } else if (this.Result! >= 25 && this.Result! < 30) {
      this.BmiResult = 'Over Weight';
    } else {
      this.BmiResult = 'Obese';
    }
  }

  // Reset Butonu sıfırlama
  reset() {
    this.height = '';
    this.weight = '';
    this.Result = null;
    this.BmiResult = '';
  }
}

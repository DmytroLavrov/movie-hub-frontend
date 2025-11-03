import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'sh-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  public ctrl = new FormControl<string>('');
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.ctrl.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((value) => this.search.emit(value ?? ''));
  }
}

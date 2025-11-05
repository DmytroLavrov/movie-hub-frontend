import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sh-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  private readonly visiblePages = 1;

  public getPagesArray(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxPages = this.totalPages;
    const current = this.currentPage;
    const delta = this.visiblePages;

    if (maxPages <= 1) {
      return [];
    }

    // Add the first page
    pages.push(1);

    // Determine the display range around the current page
    let start = Math.max(2, current - delta);
    let end = Math.min(maxPages - 1, current + delta);

    // Add "..." at the beginning if needed
    if (start > 2) {
      pages.push('...');
    }

    // Add pages within the range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add "..." at the end if needed
    if (end < maxPages - 1) {
      pages.push('...');
    }

    // Додаємо останню сторінку, якщо вона не 1 і не вже в діапазоні
    if (maxPages > 1 && pages.indexOf(maxPages) === -1) {
      pages.push(maxPages);
    }

    // Add the last page if it's not 1 and not already in the range
    const uniquePages = pages.filter((value, index, self) => {
      // Keep only one "..." and unique page numbers
      return value === '...' ? self.indexOf(value) === index : true;
    });

    return uniquePages;
  }

  public goToPage(page: number | string): void {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}

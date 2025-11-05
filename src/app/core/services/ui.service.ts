import {
  DOCUMENT,
  Inject,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService implements OnDestroy {
  private renderer: Renderer2;
  private readonly mobileBreakpoint = 768;
  private destroy$ = new Subject<void>();

  public isMobileView$: Observable<boolean>;
  private menuOpenSubject = new BehaviorSubject<boolean>(false);
  public isMenuOpen$ = this.menuOpenSubject.asObservable();

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.isMobileView$ = fromEvent(window, 'resize').pipe(
      startWith(null),
      map(() => window.innerWidth <= this.mobileBreakpoint),
      distinctUntilChanged(),
    );

    this.isMobileView$.pipe(takeUntil(this.destroy$)).subscribe((isMobile) => {
      if (!isMobile) {
        this.setMenuOpen(false);
      }
    });
  }

  public toggleMenu(): void {
    this.setMenuOpen(!this.menuOpenSubject.value);
  }

  public setMenuOpen(open: boolean): void {
    if (this.menuOpenSubject.value !== open) {
      this.menuOpenSubject.next(open);
      this.handleScrollLock(open);
    }
  }

  private handleScrollLock(open: boolean): void {
    const isMobile = window.innerWidth <= this.mobileBreakpoint;

    if (open && isMobile) {
      this.renderer.addClass(this.document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ICalendarProps } from 'office-ui-fabric-react/lib/Calendar';

@Component({
  selector: 'fab-calendar',
  exportAs: 'fabCalendar',
  template: `
    <Calendar
      #reactNode
      [componentRef]="componentRef"
      [className]="className"
      [isMonthPickerVisible]="isMonthPickerVisible"
      [isDayPickerVisible]="isDayPickerVisible"
      [showMonthPickerAsOverlay]="showMonthPickerAsOverlay"
      [today]="today"
      [value]="value"
      [firstDayOfWeek]="firstDayOfWeek"
      [dateRangeType]="dateRangeType"
      [autoNavigateOnSelection]="autoNavigateOnSelection"
      [showGoToToday]="showGoToToday"
      [strings]="strings"
      [highlightCurrentMonth]="highlightCurrentMonth"
      [highlightSelectedMonth]="highlightSelectedMonth"
      [navigationIcons]="navigationIcons"
      [showWeekNumbers]="showWeekNumbers"
      [firstWeekOfYear]="firstWeekOfYear"
      [dateTimeFormatter]="dateTimeFormatter"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [showSixWeeksByDefault]="showSixWeeksByDefault"
      [workWeekDays]="workWeekDays"
      [selectDateOnClick]="selectDateOnClick"
      [showCloseButton]="showCloseButton"
      [allFocusable]="allFocusable"
      [SelectDate]="onSelectDateHandler"
      [Dismiss]="onDismissHandler"
    >
    </Calendar>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabCalendarComponent extends ReactWrapperComponent<ICalendarProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ICalendarProps['componentRef'];
  @Input() className?: ICalendarProps['className'];
  @Input() isMonthPickerVisible?: ICalendarProps['isMonthPickerVisible'];
  @Input() isDayPickerVisible?: ICalendarProps['isDayPickerVisible'];
  @Input() showMonthPickerAsOverlay?: ICalendarProps['showMonthPickerAsOverlay'];
  @Input() today?: ICalendarProps['today'];
  @Input() value?: ICalendarProps['value'];
  @Input() firstDayOfWeek?: ICalendarProps['firstDayOfWeek'];
  @Input() dateRangeType?: ICalendarProps['dateRangeType'];
  @Input() autoNavigateOnSelection?: ICalendarProps['autoNavigateOnSelection'];
  @Input() showGoToToday?: ICalendarProps['showGoToToday'];
  @Input() strings: ICalendarProps['strings'];
  @Input() highlightCurrentMonth?: ICalendarProps['highlightCurrentMonth'];
  @Input() highlightSelectedMonth?: ICalendarProps['highlightSelectedMonth'];
  @Input() navigationIcons?: ICalendarProps['navigationIcons'];
  @Input() showWeekNumbers?: ICalendarProps['showWeekNumbers'];
  @Input() firstWeekOfYear?: ICalendarProps['firstWeekOfYear'];
  @Input() dateTimeFormatter?: ICalendarProps['dateTimeFormatter'];
  @Input() minDate?: ICalendarProps['minDate'];
  @Input() maxDate?: ICalendarProps['maxDate'];
  @Input() showSixWeeksByDefault?: ICalendarProps['showSixWeeksByDefault'];
  @Input() workWeekDays?: ICalendarProps['workWeekDays'];
  @Input() selectDateOnClick?: ICalendarProps['selectDateOnClick'];
  @Input() showCloseButton?: ICalendarProps['showCloseButton'];
  @Input() allFocusable?: ICalendarProps['allFocusable'];

  @Output() readonly onSelectDate = new EventEmitter<{ date: Date; selectedDateRangeArray?: Date[] }>();
  @Output() readonly onDismiss = new EventEmitter<void>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onSelectDateHandler = this.onSelectDateHandler.bind(this);
    this.onDismissHandler = this.onDismissHandler.bind(this);
  }

  onSelectDateHandler(date: Date, selectedDateRangeArray?: Date[]) {
    this.onSelectDate.emit({
      date,
      selectedDateRangeArray,
    });
  }

  onDismissHandler() {
    this.onDismiss.emit();
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg attr.width="{{width}}px" attr.height="{{height}}px" attr.fill="{{fill}}" attr.class="{{class}}">
      <use attr.xlink:href="assets/icons/{{icon}}.svg#{{icon}}"></use>
    </svg>
  `,
  styleUrls: ['./icon.component.scss']
})

export class IconComponent implements OnInit {
  @Input() icon!: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() size?: number = 24;
  @Input() fill?: string;
  @Input() class?: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.width) {
      this.width = this.size;
    }

    if (!this.height) {
      this.height = this.size;
    }
  }

}

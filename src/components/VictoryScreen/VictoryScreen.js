import { CloseButton } from '@components/common';
import { MyComponent } from '@lib';
import './VictoryScreen.scss';

export class VictoryScreen extends MyComponent {
  constructor() {
    super({ classNames: ['victory-screen'] });

    const heading = new MyComponent({
      tagName: 'h2',
      classNames: ['victory-screen__heading'],
      textContent: 'Congratulations!',
    });

    const text = new MyComponent({
      tagName: 'p',
      classNames: ['victory-screen__text'],
      textContent:
        'You have defeated the evil Ruby Wizard and his minions with the awesome power of CSS!',
    });

    const closeButton = new CloseButton({
      classNames: ['victory-screen__close-button'],
      onClickCbs: [
        () => {
          this.HTMLElement.remove();
        },
      ],
    });

    this.appendChildren(
      closeButton,
      new MyComponent({
        classNames: ['victory-screen__wrapper'],
        children: [heading, text],
      })
    );
  }

  static show(parentNode) {
    const victoryScreenElement = new VictoryScreen().HTMLElement;
    parentNode.appendChild(victoryScreenElement);
  }
}

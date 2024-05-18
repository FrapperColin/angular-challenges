import { ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';

type Selector = 'class' | 'dataTestId';
type AttributeSelector = 'contains' | 'start-with' | 'default';
type InputAttribute = 'checked' | 'disabled' | 'readonly' | 'type';
type ButtonAttribute = 'disabled';

export function queryExpectAttribute(
  dataTestId: string,
  attribute: string,
  parentElement: HTMLElement | undefined = undefined,
): jest.JestMatchers<any> {
  let element: HTMLElement;
  if (parentElement) {
    element = parentElement.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLElement;
  } else {
    element = document.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLElement;
  }
  return expect(element.getAttribute(attribute));
}

export function queryExpectSpecificInputAttribute(
  dataTestId: string,
  attribute: InputAttribute,
  parentElement: HTMLElement | undefined = undefined,
): jest.JestMatchers<any> {
  let element: HTMLInputElement;
  if (parentElement) {
    element = parentElement.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLInputElement;
  } else {
    element = document.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLInputElement;
  }

  return getExpectInputAttribute(attribute, element);
}

export function queryExpectSpecificButtonAttribute(
  dataTestId: string,
  attribute: ButtonAttribute,
  parentElement: HTMLElement | undefined = undefined,
): jest.JestMatchers<any> {
  let element: HTMLButtonElement;
  if (parentElement) {
    element = parentElement.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLButtonElement;
  } else {
    element = document.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLButtonElement;
  }

  return getExpectButtonAttribute(attribute, element);
}

export function queryExpect(
  dataTestId: string,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): jest.JestMatchers<any> {
  let element: HTMLElement;
  const currAttributeSelector = getCurrentSelector(attributeSelector);
  if (parentElement) {
    element = parentElement.querySelector(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as HTMLElement;
  } else {
    element = document.querySelector(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as HTMLElement;
  }
  return expect(element);
}

export function queryExpectAllWithIndex(
  dataTestId: string,
  index: number,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): jest.JestMatchers<any> {
  let elements: NodeListOf<HTMLElement>;
  const currAttributeSelector = getCurrentSelector(attributeSelector);

  if (parentElement) {
    elements = parentElement.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  } else {
    elements = document.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  }

  return expect(elements.item(index));
}

export function queryExpectTextContentAllWithIndex(
  dataTestId: string,
  index: number,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): jest.JestMatchers<any> {
  let elements: NodeListOf<HTMLElement>;
  const currAttributeSelector = getCurrentSelector(attributeSelector);
  if (parentElement) {
    elements = parentElement.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  } else {
    elements = document.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  }

  return expect(elements.item(index).textContent?.trim());
}

export function getExpectAllInputAttributeWithIndex(
  dataTestId: string,
  index: number,
  attribute: string,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): jest.JestMatchers<any> {
  let elements: NodeListOf<HTMLElement>;
  const currAttributeSelector = getCurrentSelector(attributeSelector);
  if (parentElement) {
    elements = parentElement.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  } else {
    elements = document.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  }

  return expect(elements.item(index).getAttribute(attribute));
}

export function queryExpectTextContent(
  dataTestId: string,
  parentElement: HTMLElement | undefined = undefined,
  selector: Selector | undefined = 'dataTestId',
): jest.JestMatchers<any> {
  let element: HTMLElement;
  const currSelector = selector === 'dataTestId' ? 'data-testid' : 'class';
  if (parentElement) {
    element = parentElement.querySelector(
      `[${currSelector}="${dataTestId}"]`,
    ) as HTMLElement;
  } else {
    element = document.querySelector(
      `[${currSelector}="${dataTestId}"]`,
    ) as HTMLElement;
  }
  return expect(element.textContent?.trim());
}

export function queryExpectInnerText(
  dataTestId: string,
  parentElement: HTMLElement | undefined = undefined,
  selector: Selector | undefined = 'dataTestId',
): jest.JestMatchers<any> {
  let element: HTMLElement;
  const currSelector = selector === 'dataTestId' ? 'data-testid' : 'class';
  if (parentElement) {
    element = parentElement.querySelector(
      `[${currSelector}="${dataTestId}"]`,
    ) as HTMLElement;
  } else {
    element = document.querySelector(
      `[${currSelector}="${dataTestId}"]`,
    ) as HTMLElement;
  }
  return expect(element.innerText);
}

export function queryExpectLength(
  dataTestId: string,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): jest.JestMatchers<any> {
  let element: NodeListOf<HTMLElement>;
  const currAttributeSelector = getCurrentSelector(attributeSelector);
  if (parentElement) {
    element = parentElement.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  } else {
    element = document.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  }
  return expect(element.length);
}

export function queryExpectAttributeToExist(
  dataTestId: string,
  attribute: string,
  parentElement: HTMLElement | undefined = undefined,
  context: string | undefined = undefined,
): void {
  const matcher: jest.JestMatchers<any> = queryExpectAttribute(
    dataTestId,
    attribute,
    parentElement,
  );
  matcher.not.toBeNull();
  matcher.toBeDefined();
}

export function queryExpectToExist(
  dataTestId: string,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
  context: string | undefined = undefined,
): void {
  const matcher: jest.JestMatchers<any> = queryExpect(
    dataTestId,
    parentElement,
    attributeSelector,
  );
  matcher.not.toBeNull();
  matcher.toBeDefined();
}

export function queryExpectAllWithIndexToExist(
  dataTestId: string,
  index: number,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
  context: string | undefined = undefined,
): void {
  const matcher: jest.JestMatchers<any> = queryExpectAllWithIndex(
    dataTestId,
    index,
    parentElement,
    attributeSelector,
  );
  matcher.not.toBeNull();
  matcher.toBeDefined();
}

export function expectToExist<T>(
  actual: T,
  context: string | undefined = undefined,
): void {
  expect(actual).not.toBeNull();
  expect(actual).toBeDefined();
}

function getExpectInputAttribute(
  attribute: InputAttribute,
  element: HTMLInputElement,
) {
  let expectation;
  switch (attribute) {
    case 'checked':
      expectation = expect(Boolean(element.checked));
      break;
    case 'disabled':
      expectation = expect(Boolean(element.disabled));
      break;
    case 'readonly':
      expectation = expect(Boolean(element.readOnly));
      break;
    case 'type':
      expectation = expect(element.type);
      break;
    default:
      throw new Error('unsupported attribute');
  }
  return expectation;
}

function getExpectButtonAttribute(
  attribute: ButtonAttribute,
  element: HTMLButtonElement,
) {
  let expectation;
  switch (attribute) {
    case 'disabled':
      expectation = expect(element.disabled);
      break;
    default:
      throw new Error('unsupported attribute');
  }
  return expectation;
}

function getCurrentSelector(attributeSelector: AttributeSelector) {
  let currAttributeSelector: string;
  switch (attributeSelector) {
    case 'start-with':
      currAttributeSelector = '^';
      break;
    case 'contains':
      currAttributeSelector = '~';
      break;
    case 'default':
      currAttributeSelector = '';
      break;
    default:
      currAttributeSelector = '';
      break;
  }
  return currAttributeSelector;
}

export function queryExpectInputAttribute(
  dataTestId: string,
  attribute: string,
  parentElement: HTMLElement | undefined = undefined,
): jest.JestMatchers<any> {
  let element: HTMLInputElement;
  if (parentElement) {
    element = parentElement.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLInputElement;
  } else {
    element = document.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLInputElement;
  }
  return expect(element.getAttribute(attribute));
}

export function dataTestId(tagName: string): HTMLElement {
  return document.querySelector(`[data-testid="${tagName}"]`) as HTMLElement;
}

export function dataInputSelect(tagName: string): HTMLInputElement {
  return document.querySelector(
    `[data-testid="${tagName}"]`,
  ) as HTMLInputElement;
}

export function dataTestIdAll(tagName: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(
    `[data-testid="${tagName}"]`,
  ) as NodeListOf<HTMLElement>;
}

export function dataTestIdAllWithIndex(
  tagName: string,
  index: number,
): HTMLElement {
  return document
    .querySelectorAll(`[data-testid="${tagName}"]`)
    .item(index) as HTMLElement;
}

export function doAndTick(doSome: () => void, millis = 0) {
  doSome();
  tick(millis);
}

export function queryExpectClassList(
  dataTestId: string,
  parentElement: HTMLElement | undefined = undefined,
): jest.JestMatchers<any> {
  let element: HTMLElement;
  if (parentElement) {
    element = parentElement.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLElement;
  } else {
    element = document.querySelector(
      `[data-testid="${dataTestId}"]`,
    ) as HTMLElement;
  }
  return expect(element.classList);
}

export function queryExpectAllClassList(
  dataTestId: string,
  index: number,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): jest.JestMatchers<any> {
  let elements: NodeListOf<HTMLElement>;
  const currAttributeSelector = getCurrentSelector(attributeSelector);

  if (parentElement) {
    elements = parentElement.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  } else {
    elements = document.querySelectorAll(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as NodeListOf<HTMLElement>;
  }

  return expect(elements.item(index).classList);
}

export function clickOn(
  dataTestId: string,
  fixture: ComponentFixture<unknown> | RouterTestingHarness,
  parentElement: HTMLElement | undefined = undefined,
  attributeSelector: AttributeSelector | undefined = 'default',
): void {
  let button: HTMLButtonElement;
  const currAttributeSelector = getCurrentSelector(attributeSelector);
  if (parentElement) {
    button = parentElement.querySelector(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as HTMLButtonElement;
  } else {
    button = document.querySelector(
      `[data-testid${currAttributeSelector}="${dataTestId}"]`,
    ) as HTMLButtonElement;
  }
  expectToExist(button, `no button with [data-testid="${dataTestId}"]`);
  button.click();
  fixture.detectChanges();
}

export function formSelect(
  dataTestId: string,
  entrydataTestId: string,
  fixture: ComponentFixture<unknown> | RouterTestingHarness,
): void {
  clickOn(dataTestId, fixture);
  clickOn(`${dataTestId}-${entrydataTestId}`, fixture);
}

export function formTextarea(
  dataTestId: string,
  data: string,
  fixture: ComponentFixture<unknown>,
): void {
  formInput(dataTestId, data, fixture);
}

export function formInput(
  dataTestId: string,
  data: string,
  fixture: ComponentFixture<unknown> | RouterTestingHarness,
): void {
  const input = document.querySelector(
    `[data-testid="${dataTestId}"]`,
  ) as HTMLInputElement;
  expectToExist(input, `no input with [data-testid="${dataTestId}"]`);
  input.value = data;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

export function formCheckbox(
  dataTestId: string,
  fixture: ComponentFixture<unknown> | RouterTestingHarness,
): void {
  const checkbox = document.querySelector(
    `[data-testid="${dataTestId}"]`,
  ) as HTMLInputElement;
  expectToExist(checkbox, `no checkbox with [data-testid="${dataTestId}"]`);
  checkbox.click();
  checkbox.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

export function checkboxValue(dataTestId: string): boolean {
  const checkbox = document.querySelector(
    `[data-testid="${dataTestId}"]`,
  ) as HTMLInputElement;
  return checkbox.checked;
}

export function formRadioGroup(
  dataTestId: string,
  value: string,
  fixture: ComponentFixture<unknown>,
): void {
  clickOn(`${dataTestId}-${value}`, fixture);
  const radio = document.querySelector(
    `[data-testid="${dataTestId}-${value}"]`,
  ) as HTMLInputElement;
  expect(radio.checked).toBe(true);
}

export function formToggle(
  dataTestId: string,
  fixture: ComponentFixture<unknown>,
): void {
  const toggle = document.querySelector(
    `[data-testid="${dataTestId}"]`,
  ) as HTMLInputElement;
  expectToExist(toggle, `no checkbox with [data-testid="${dataTestId}"]`);
  clickOn(`${dataTestId}`, fixture);
  expect(toggle.checked).toBe(true);
}

export function focusOn(
  dataTestId: string,
  fixture: ComponentFixture<unknown>,
): void {
  const element = document.querySelector(
    `[data-testid="${dataTestId}"]`,
  ) as HTMLElement;
  expectToExist(element, `no element with [data-testid="${dataTestId}"]`);
  element.dispatchEvent(new Event('focus'));
  fixture.detectChanges();
}

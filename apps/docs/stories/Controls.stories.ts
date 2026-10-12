import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = { title: 'Components/Controls', tags: ['!autodocs'] };
export default meta;

export const Stepper: StoryObj = {
  render: () => html`<div style="display:flex;gap:16px;align-items:center">
    <ds-stepper label="Cantidad" value="1" min="0" max="5"></ds-stepper>
    <ds-stepper label="Desactivado" disabled></ds-stepper>
  </div>`,
};

export const Select: StoryObj = {
  name: 'Pop-up (Select)',
  render: () => html`<ds-select label="Frecuencia">
    <option value="d">Diario</option>
    <option value="w" selected>Semanal</option>
    <option value="m">Mensual</option>
  </ds-select>`,
};

export const DatePicker: StoryObj = {
  name: 'Date picker',
  render: () => html`<div style="display:grid;gap:12px;justify-items:start">
    <ds-date-picker label="Cita" value="2024-05-22T16:20"></ds-date-picker>
    <ds-date-picker type="date" label="Fecha" value="2024-05-22"></ds-date-picker>
    <ds-date-picker type="time" label="Hora" value="16:20"></ds-date-picker>
  </div>`,
};

export const Progress: StoryObj = {
  render: () => html`<div style="display:grid;gap:16px;max-width:320px">
    <ds-progress label="Subida" value="40"></ds-progress>
    <ds-progress label="Semana 3 de 10" value="3" max="10" segments="10"></ds-progress>
    <ds-progress label="Semana 2,5 de 4" value="2.5" max="4" segments="4"></ds-progress>
  </div>`,
};

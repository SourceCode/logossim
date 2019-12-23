import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export default class Component extends AbstractReactFactory {
  constructor({ type, name, description, model, widget, icon }) {
    super(type);
    this.name = name;
    this.description = description;
    this.Model = model;
    this.Widget = widget;
    this.Icon = icon;
  }

  generateReactWidget(event) {
    const { Widget } = this;
    return <Widget engine={this.engine} node={event.model} />;
  }

  generateModel() {
    const { Model } = this;
    return new Model(this.type);
  }
}

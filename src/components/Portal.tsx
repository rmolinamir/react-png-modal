// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  children: React.ReactChild
  domNode?: HTMLElement
}

export default function Portal(props:IPortalProps) {
  const rootDomNode = document.getElementById('root');
  const defaultDomNode: HTMLElement = rootDomNode ? rootDomNode : document.body;
  const domNode = props.domNode || defaultDomNode;
  /**
   * React does *not* create a new div. It renders the children into `domNode`.
   * `domNode` is any valid DOM node, regardless of its location in the DOM.
   */
  return ReactDOM.createPortal(
    props.children,
    domNode
  );
}

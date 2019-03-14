import React from 'react';
import Modal from '../components/modal/Modal';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Modal component', () => {
  it('Render modal component', () => {
    const messages = [
      {
        index: 1,
        message: "1/2 I can't believe Tweeter now supports chunking "
      },
      {
        index: 2,
        message: "2/2 my messages, so I don't have to do it myself."
      }
    ]
    const props = {
      messageSplited: messages,
      title: 'Message'
    }
    const wrapper = shallow(<Modal {...props} />);
    expect(wrapper.find('.btn-close').length).toEqual(1);
    expect(wrapper.find('.body div').length).toEqual(2);
  });
})
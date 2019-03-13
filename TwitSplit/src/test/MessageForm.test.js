import React from 'react';
import MessageForm from '../components/message-form/MessageForm';
import Modal from '../components/modal/Modal';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Message form component', () => {
  const wrapper = shallow(<MessageForm />);

  it('Handle onChange message', () => {
    const event = { target: { value: 'Message testing' } }
    wrapper.find('textarea').simulate('change', event);
    expect(wrapper.state().message).toBe('Message testing');
  });

  it('Handle submit send function', () => {
    const form = wrapper.find('form');
    const event = { preventDefault: () => { } }
    form.simulate('submit', event);
    const result = [
      {
        index: 1,
        message: wrapper.state().message
      }
    ]
    wrapper.setState({ message: 'Message testing', show: false, messageSplited: result });
    expect(wrapper.find('.btn-send').length).toEqual(1);
  });

  it('Message is less than or equal 50 characters', () => {
    const message = "Message is less than or equal 50 characters";
    wrapper.setState({ message });
    const form = wrapper.find('form');
    const event = { preventDefault: () => { } }
    form.simulate('submit', event);
    const result = [
      {
        index: 1,
        message: "Message is less than or equal 50 characters"
      }
    ]
    expect(wrapper.state().messageSplited).toEqual(result);
  });

  it('Message is more 50 characters', () => {
    const message = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.";
    wrapper.setState({ message });
    const form = wrapper.find('form');
    const event = { preventDefault: () => { } }
    form.simulate('submit', event);
    const result = [
      {
        index: 1,
        message: "1/2 I can't believe Tweeter now supports chunking "
      },
      {
        index: 2,
        message: "2/2 my messages, so I don't have to do it myself."
      }
    ]
    expect(wrapper.state().messageSplited).toEqual(result);
  });

  it('Message is no left', () => {
    const message = "Instead of rejecting these messages, we would like to add a new feature that will split the message.";
    wrapper.setState({ message });
    const form = wrapper.find('form');
    const event = { preventDefault: () => { } }
    form.simulate('submit', event);
    const result = [
      {
        index: 1,
        message: "1/2 Instead of rejecting these messages, we would "
      },
      {
        index: 2,
        message: "2/2 like to add a new feature that will split the message."
      }
    ]
    expect(wrapper.state().messageSplited).toEqual(result);
  });

  it('message contains a span of non-whitespace characters longer than 50 characters', () => {
    const message = "Ican'tbelieveTweeternowsupportschunkingmymessages,soIdon'thavetodo it myself.";
    wrapper.setState({ message });
    const form = wrapper.find('form');
    const event = { preventDefault: () => { } }
    form.simulate('submit', event);
    const result = [
      {
        index: 1,
        message: 'Sorry! The message contains a span of non-whitespace characters longer than 50 characters'
      }
    ]
    expect(wrapper.state().messageSplited).toEqual(result);
  });

  it('Handle close popup button', () => {
    wrapper.find(Modal).first().getElement().props.closePopup();
  });

});
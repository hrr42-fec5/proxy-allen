import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.jsx';
import Image from '../Image.jsx';
import Single from '../Single.jsx';
import Animate from '../Single.jsx';
import Multi from '../Multi.jsx';


configure({ adapter: new Adapter() });

describe('Image Carousel Tests', () => {

    describe('App component', () => {
    it('expect initial view to be main', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      const viewState = wrapper.state().view;
      expect(viewState).toEqual('main');
    });

    it('expect styled components Container, Carousel, and Button to be rendered', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      expect(wrapper.find('container')).toHaveLength(1);
      expect(wrapper.find('carousel')).toHaveLength(1);
      expect(wrapper.find('button')).toHaveLength(1);
    });

    it('expect view components to not be initially rendered', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      expect(wrapper.find(Single)).toHaveLength(0);
      expect(wrapper.find(Multi)).toHaveLength(0);
    });

    it('expect styled Button click handler to render multi view', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      wrapper.find('button').simulate('click');
      const viewState = wrapper.state().view;
      expect(viewState).toEqual('multi');
    });

    it('expect number of photos for button text is correct', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      wrapper.setState({ imageUrls: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]})
      expect(wrapper.find('button').text()).toEqual('14 photos +');
    });

    it('expect images rendered in carousel', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      wrapper.setState({ imageUrls: [0,1,2,3,4,5,6,7,8,9]})
      expect(wrapper.find(Image)).toHaveLength(10);
    });

    it('expect Single component to be rendered when view is changed to single', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      wrapper.setState({ view: 'single'})
      expect(wrapper.find(Single)).toHaveLength(1);
    });

    it('expect Multi component to be rendered when view is changed to multi', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      wrapper.setState({ view: 'multi'})
      expect(wrapper.find(Multi)).toHaveLength(1);
    });
  });


  describe('Image component', () => {

    it('expect one big StyledImg Component', () => {
      const wrapper = shallow(<Image idx={0} imageUrls={[0,1,2]} />);
      expect(wrapper.find('styledimg')).toHaveLength(1);
    });

    it('expect two smaller StyledImg Components', () => {
      const wrapper = shallow(<Image idx={1} imageUrls={[0,1,2]} />);
      expect(wrapper.find('styledimg')).toHaveLength(2);
    });

    it('expect StyledImg Component to handle click event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(<Image idx={0} handleClick={mockFn}/>);
      wrapper.find('styledimg').simulate('click');
      expect(mockFn).toHaveBeenCalled();
    });
  });


  describe('SingleView component', () => {

    it('expect only one image to be loaded', () => {
      const wrapper = shallow(<Single idx={0} imageUrls={[0,1,2]} />);
      expect(wrapper.find('styledimg')).toHaveLength(1);
    });

    it('expect the right correct index number to be displayed', () => {
      const wrapper = shallow(<Single idx={1} imageUrls={[0,1,2]} total={3} />);
      expect(wrapper.find('styledcounter').text()).toEqual('2 of 3');
    });

    it('expect animation to play upon loading of component', () => {
      const wrapper = shallow(<Single />);
      expect(wrapper.find(Animate)).toBeDefined();
    });
  });


  describe('MultiView component', () => {

    it('expect all images to be loaded', () => {
      const wrapper = shallow(<Multi imageUrls={[1,2,3,4,5,6,7,8,9,10,11]} />);
      expect(wrapper.find('styledimg')).toHaveLength(11);
    });

    it('expect restaurant name to be rendered', () => {
      const wrapper = shallow(<Multi imageUrls={[1,2,3,4,5,6,7,8,9,10,11]} name={'RestaurantName'} />);
      expect(wrapper.find('stylednav').at(1).text()).toEqual('RestaurantName');
    });

    it('expect close button to handle click event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(<Multi imageUrls={[1,2,3,4,5]} handleView={mockFn} />);
      wrapper.find('styledclosed').simulate('click');
      expect(mockFn).toHaveBeenCalled();
    });
  });
});

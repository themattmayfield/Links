import { Responsive, WidthProvider } from 'react-grid-layout';
import NewCard from './NewCard'

const ResponsiveGridLayout = WidthProvider(Responsive);
export default class Cards extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    // const layout = [
    //   {i: 'a', x: 0, y: 0, w: 2, h: 1},
    //   {i: 'b', x: 0, y: 1, w: 1, h: 1},
    //   {i: 'c', x: 1, y: 1, w: 1, h: 1},
    //   {i: 'd', x: 0, y: 2, w: 2, h: 1},
    //   {i: 'g', x: 0, y: 3, w: 2, h: 1}
    // ];
    
    const myLayout={lg: this.props.layout, md: this.props.layout, sm: this.props.layout, xs: this.props.layout, xxs: this.props.layout}
    return (
      <ResponsiveGridLayout isResizable={false} className="layout" cols={{lg: 2, md: 2, sm: 2, xs: 2, xxs: 2}} layouts={myLayout}>       
        
        {this.props.layout.map((item, i) => 
        
        <div key={item.i}>
          <NewCard />
        </div>
        
        
        )}
        
        {/* 
        <div className="bg-gray-400 rounded-xl" key={item.i}></div>
        
        <div style={{
      backgroundImage: `url(/kofi.png)`,
    }}
    className="bg-blue-600 rounded-xl bg-cover bg-no-repeat bg-center " key="b"></div>
        <div style={{
      backgroundImage: `url(/spotify.jpg)`,
    }}
    className="bg-blue-600 rounded-xl bg-cover bg-no-repeat bg-center " key="c">c</div>
        <div className="bg-green-600 rounded-xl" key="d">d</div> */}
        </ResponsiveGridLayout>
    )
  }
}
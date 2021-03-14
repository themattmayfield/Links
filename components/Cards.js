import { Responsive, WidthProvider } from 'react-grid-layout';
import NewCard from './NewCard'
import JiggleMode from '../utils/scripts/jiggleMode'

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Cards(props) {
      
    
    const myLayout={lg: props.layout, md: props.layout, sm: props.layout, xs: props.layout, xxs: props.layout}
    return (
      // <JiggleMode >
      <ResponsiveGridLayout isResizable={false} className="layout" cols={{lg: 2, md: 2, sm: 2, xs: 2, xxs: 2}} layouts={myLayout}>       
        
        {props.layout.map((item, i) => 
        
        <div key={item.i}>
          <NewCard />
        </div>       
        
        )}
        </ResponsiveGridLayout>
        // </JiggleMode >
    )
  
}

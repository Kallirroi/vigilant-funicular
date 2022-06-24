import * as React from 'react';
import Header from '../Header';
import Controls from '../Controls';
import List from '../List';
import Viewer from '../Viewer';

function Home() {
  const [isViewerMode, setViewerMode] = React.useState(false)
  const toggleViewer = () => {
    setViewerMode(!isViewerMode)
  }
  return (
    <div>
      <Header />
      <Controls />
      {isViewerMode 
      ? 
        <Viewer toggleViewer={toggleViewer}  />
      :
        <List toggleViewer={toggleViewer} />
      } 
    </div>
  );
}

export default Home;

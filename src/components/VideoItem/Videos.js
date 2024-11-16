
function Videos({src,className}) {
    
    return (
          <video src={src} controls className={className} width="400" height="225"/>
    );
}

export default Videos;

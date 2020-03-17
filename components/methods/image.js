const imageMethods = {
  getMediaSourceOfLink( link ){
    let src;
    if(link){
      if(link.media){
        if(link.media.s3 && link.media.s3.small){
          src = link.media.s3.small.location
        }
      }
    }else{
      return 'empty link'
    }

    return src || 'no meta image source'
  },
  thumbImages(item) {
    let imgsrcArr = [];
    if (item && item.attachment && item.attachment[0]) {
      item.attachment.forEach((attachment) => {
        let src = attachment.src; //기본 소스;

        /* s3 데이터로 바꾸는 부분 : 사용중단
        if (attachment.media && attachment.media.s3) {
          let s3 = attachment.media.s3
          if (s3.thumb && s3.thumb.location) {
            src = s3.thumb.location;
          } else if (s3.small && s3.small.location) {
            src = s3.small.location;
          }
        }
        */
        imgsrcArr.push(src);
      });
    } else if (item.links && item.links[0]) {
      const link = item.links[0];
      if (link.media && link.media.s3 && link.media.s3.small) {
        imgsrcArr.push(link.media.s3.small.location);
      } else if (link.media) {
        imgsrcArr.push(link.media.origin);
      }
    }

    return imgsrcArr[0] ? imgsrcArr : null;
  }
}


export default imageMethods

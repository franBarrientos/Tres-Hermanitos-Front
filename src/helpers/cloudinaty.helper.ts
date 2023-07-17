export const releaseImgUrl = (url:string)=>{
  const uploadIndex = url.indexOf("/upload");
  if (uploadIndex !== -1) {
    const prefix = url.substring(0, uploadIndex + 7); // Incluye "/upload"
    const suffix = url.substring(uploadIndex + 7); // Después de "/upload"
    
    return `${prefix}/w_1000,ar_1:1,c_fill,g_auto,f_webp${suffix}`;
  }
  
  return url;
}
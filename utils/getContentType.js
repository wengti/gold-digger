
export const getContentType = function(fileExt){

    const extToContentType = {
        '.png': 'image/png',
        '.css' : 'text/css',
        '.js' : 'text/javascript'
    }

    return extToContentType[fileExt] || 'text/html'
}
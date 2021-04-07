export const  renderFontOption = (size)=>{
    return {
        title: size,
        model: `${size}px`,
        view:{
            name:"div",
            styles: {
                'font-size':'12px',
            }
        }
    }
}

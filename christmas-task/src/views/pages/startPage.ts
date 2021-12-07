import { PageRenderer } from './PageRenderer'

let StartPage: PageRenderer = {
    render: async () => {
        let view =  /*html*/`
         
        
        `
        return view
    },
    after_render: async () => { }

}

export { StartPage };
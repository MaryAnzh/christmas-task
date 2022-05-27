import { PageRenderer } from './PageRenderer'

let Error404: PageRenderer = {
    render: async () => {
        let view =  /*html*/`
            <section class="error404">
                <h1> 404 Error </h1>
            </section>
        `
        return view
    },
    after_render: async () => {
    }
}

export { Error404 };
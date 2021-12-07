let Footer = {
    render: async () => {
        let view =  /*html*/`
            <ul>
            <ll>
               <a href="https://rs.school" target="__blank">
                 <div class="schoolLogo"></div>
               </a>
            </ll>
            <ll >
                <a class="footerText" href="https://github.com/MaryAnzh" target="__blank">
                    MaryAnzh
                </a>
            </ll>
            <ll class="footerText" onclick="onclk()">2021</ll>
        </ul>
        `
        return view
    },
    after_render: async () => { }

}

export { Footer };
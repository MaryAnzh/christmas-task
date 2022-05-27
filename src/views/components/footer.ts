let Footer = {
    render: async () => {
        let view =  /*html*/`
            <div class="footer-wrap">
                <div class="footer-info">
                    <p class="footer-text">©</p>
                    <p class="footer-text">2021</p>
                    <a class="footer-text username" href="https://github.com/MaryAnzh" target="_blank">MaryAnzh</a>
                </div>
                <a class="rss-logo" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer"></a>
            </div>
        `
        return view
    },
    after_render: async () => { }

}

export { Footer };
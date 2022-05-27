interface PageRenderer {
    render(): Promise<string>;
    after_render(): Promise<void>;
};

export { PageRenderer };
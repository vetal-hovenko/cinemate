const PLOT_MAX_LENGTH = 80;

export function moviePlotTrim(plot: string, plotLength = PLOT_MAX_LENGTH) {
    if (plot.length < PLOT_MAX_LENGTH) {
        return plot;
    }

    const trimmedPlot = plot.slice(0, plotLength) + "...";

    return trimmedPlot;
}

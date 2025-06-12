import { useEffect, useState } from 'react'
import { useConnect } from "redux-bundler-hook";
import "./legend.css"

const LayerTree = ({ children, ...props }) => {
    const {
        layers
    } = useConnect(
        "selectLayers"
    )


    const colorParser = (style) => {
        console.log(style)
        let fill = style.image_.fill_.color_;
        let stroke = style.image_.stroke_.color_
        let strokeWidth = style.image_.stroke_.width_

        return {
            backgroundColor: `${fill}`,
            border: `${strokeWidth}px solid ${stroke}`
        }
    }

    return (
        <div className="Legend">
            <h1>Legend</h1>
            <div>
                <table>
                    {layers.map((layer) => {
                        return (
                            <tr key={layer.id}><td style={{ "paddingLeft": "1px", "paddingRight": "4px", "paddingBottom": "4px" }}>
                                <div className={'Circle'} style={colorParser(layer.style ? layer.style : layer)}></div>
                            </td>
                                <td>{layer.name}</td>
                            </tr>
                        )
                    })}
                </table>
                <div></div>
            </div>

        </div>
    )
}

export default LayerTree;
export { LayerTree };
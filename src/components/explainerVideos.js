import React,{ useState, useEffect, useRef} from 'react';
import {StaticImage} from "gatsby-plugin-image"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import gsap from "gsap"
import "./explainerVideos.scss"
import useExplainerquery from "../hooks/explainer"

const ExplainerVideos = () => {
    const {explainerVideos} = useExplainerquery();

    var [active, setActive] = useState(false);
    var actor = useRef();
    var tl = useRef();

    useEffect(()=>{
        
        tl.current = gsap.timeline({});
        tl.current.to(actor.current, {
            opacity:0,
            height: 0, 
            display:"none",
            duration:1})
            
    },[])

    function handleClick(){
        console.log("click");
        setActive(!active)
    }

    useEffect(()=>{
        //console.log(active)
        tl.current.reversed(active);
    },[active])
        
    return (
        <div id="sectionExplainer" className="category">
            <AnchorLink href="#explainer" >
            <div 
            onClick={handleClick}
            className="category-title">
            <StaticImage
                src="../images/exp.svg"
                alt="titulo character animation"
                placeholder="blurred"
                layout="constrained"
                className="imgCat"
                />
            </div>
            </AnchorLink>
            <div ref={elem=>{actor.current = elem}} className="containerVideos">
            <div  id="explainer" className="explainerContainer">
                {explainerVideos.map(node =>{
                    var iFrame = JSON.parse(node.oembed).rawData.html
                    console.log()
                    return(
                        <div className="exIframe" dangerouslySetInnerHTML={{ __html: iFrame}} /> 
                    
                    )
                })}
            </div>
        </div>
            
        </div>
    );
}

export default ExplainerVideos;
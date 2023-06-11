import Background from '../Background';
import './loader.css'

function Loader() {
    return (
        <div className='container_loading'>
            <Background />
            <div className='background_box_loading'>
                <div className='load_container'>
                    <div className="loading">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;
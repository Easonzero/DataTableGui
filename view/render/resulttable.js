const $  = require( 'jquery' );
/**
 * Created by eason on 6/3/16.
 */

module.exports = ()=>{
    let resultPanel = $('#result'),
        actionBtn = $('#action');
    resultPanel.css('left',window.innerWidth*(-0.85)+20);
    window.addEventListener('resize',()=>resultPanel.css('left',window.innerWidth*(-0.85)+20),false);
    actionBtn.click(()=>{
        var left = resultPanel.css('left');
        if (left == '0px' || left == '') {
            resultPanel.css('left',window.innerWidth*(-0.85)+20);
            actionBtn.text('>>');
        } else {
            resultPanel.css('left','0px');
            actionBtn.text('<<');
        };
    });
};

(function (window, document) {
    'use strict';
    var bgPage = chrome.extension.getBackgroundPage(),
        createRuleBtn = document.getElementById('create_rule'),
        listBox = document.getElementById('list_box'),
        itemStr = '<div class="item"><input type="text"/><span class="off" data-status="off">开启</span></div>',
        rulesStorage = JSON.parse(bgPage.localStorage.getItem('EVIL_RULES')),
        rulesHandle = function () {
            var list = listBox.querySelectorAll('.item'),
                i,
                len = list.length,
                rules = [];
            for(i= 0; i< len; i+= 1){
                if(list[i].querySelector('input').value){
                    rules.push(
                        {
                            value: list[i].querySelector('input').value,
                            status: list[i].querySelector('span').getAttribute('data-status')
                        }
                    );
                }
            }

            bgPage.localStorage.setItem('EVIL_RULES', JSON.stringify(rules));
        },
        renderRules = function () {
            var i,
                len = rulesStorage.length,
                str = '',
                text = '',
                status = '';
            for(i= 0; i< len; i+= 1){
                text = rulesStorage[i].status==='off' ? '开启': '停止';
                status = rulesStorage[i].status;
                str +='<div class="item"><input value="'+ rulesStorage[i].value +'" type="text"/>' +
                    '<span class="'+ status +'" data-status="'+ status +'">'+ text +'</span></div>';
            }
            listBox.innerHTML = str;
        };

    renderRules();

    createRuleBtn.addEventListener('click', function () {
        listBox.insertAdjacentHTML('beforeEnd', itemStr);
    });

    listBox.addEventListener('click', function (e) {
        var target = e.target,
            status = target.getAttribute('data-status'),
            input = target.parentNode.querySelector('input');

        if(target.tagName === 'SPAN'){
            if(status === 'off'){
                target.setAttribute('data-status', 'on');
                target.className = 'on';
                target.innerHTML = '停止';
            }else{
                target.setAttribute('data-status', 'off');
                target.className = 'off';
                target.innerHTML = '开启';
            }

            rulesHandle();
        }
    });

}(window, document));
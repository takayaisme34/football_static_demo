
function fetch_request(target_function, targetUrl, body, method = "post"){
    fetch(targetUrl, {
        method: method,
        body: JSON.stringify(body),
        headers:{'Content-Type':'application/json'}
    })
    .then(response => response.text())
    .then(data=>{
        target_function(data);
    })
    .catch(error=>{
        console.error('Error', error);
        alert("コネクション エラー", error);
    })
}

function open_add_team_modal(){
    document.querySelector(".addTeamModalContainer").style.display = "";
}


function close_add_team_modal(e){
    e.target.closest('.addTeamModalContainer').style.display='none'; 
    e.preventDefault(); 
}

function save_team_order(){
    const teamDivs = document.getElementsByClassName("teamDiv");
    let teamOrderInfo = []
    for (let i = 0; i < teamDivs.length; i++){
        let teamDiv = teamDivs[i];
        let teamId = teamDiv.querySelector(".teamIdInput").value;
        teamOrderInfo.push({"team_id": teamId, "order": i})
    }
    fetch_request(
        (response)=>{
            
            if (JSON.parse(response).message === "success"){
                alert("列の順番を保存しました")
            }
        },
        "/save_team_order",
        teamOrderInfo
    )

}

class RowNavigationMenu{
    constructor(){
        document.addEventListener("click", (e)=>{
            this.rowNavMenu = e.target.closest(".teamDivNavigationBar")
            if (!this.rowNavMenu){
                return;
            }
            this.teamDiv = this.rowNavMenu.parentNode;
            switch(e.target.className){
                case "moveRowUpBtn":
                    this.move_row_up();
                    break;
                case "moveRowDownBtn":
                    this.move_row_down();
                    break;
                case "addRowBtn":
                    this.createNewRow();
                    break;
                case "deleteRowBtn":
                    this.deleteRow();
                    break;
                default:
                    break;
            }
            this.parentTable = this.rowNavMenu.parentNode;
        })
    }

    deleteRow(){
        let rowid = this.teamDiv.querySelector(".teamIdInput").value;
        if (rowid === ""){
            this.teamDiv.remove()
            return;
        }
        fetch_request(
            (response)=>{
                let responseJSON = JSON.parse(response);
                if(responseJSON.message == "success"){
                    this.teamDiv.remove()
                    alert("列を消去しました")
                }
            },"/delete_team", {"rowid": rowid}
        )
    }
    insertAfter(referenceNode, newNode) {
        try{
            let rowBelow = referenceNode.nextSibling;
            referenceNode.parentNode.insertBefore(newNode, rowBelow);
        }
        catch(error){
            return;
        }
    }
    move_row_up(){
        const rowAbove = this.teamDiv.previousElementSibling;
        
        if (rowAbove) {
            this.teamDiv.parentNode.insertBefore(this.teamDiv, rowAbove);
        }
    }

    move_row_down(){
        const rowBelow = this.teamDiv.nextElementSibling;
        this.insertAfter(rowBelow, this.teamDiv);
    }
    
}

new RowNavigationMenu();
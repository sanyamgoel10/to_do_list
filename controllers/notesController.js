const { getRowDbData, getDbData, setDbData } = require("../services/db");

// GET
exports.getAllNotes = async (req, res) => {
    try {
        let allNotes = await getDbData("SELECT ID, Title, Description, created_at AS CreatedAt FROM notes_list", []);
        return res.status(200).json(allNotes);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST 
exports.createNote = async (req, res) => {
    try {
        if('undefined' == typeof req.body.Title || 'string' != typeof req.body.Title || 'undefined' == typeof req.body.Description || 'string' != typeof req.body.Description){
            return res.status(400).json({ error: "Title or Description not found in request" });
        }
    
        if((req.body.Title).trim() == ''){
            return res.status(400).json({ error: "Title cannot be empty string" });
        }
    
        let selectQuery = await getRowDbData(`select ID from notes_list where Title = ?`, [req.body.Title]);
    
        if('undefined' != typeof selectQuery){
            return res.status(409).json({ error: "Note with same Title already present" });
        }
        
        let insertNote = await setDbData(`insert into notes_list(Title, Description) values (?, ?)`, [req.body.Title, req.body.Description]);
    
        return res.status(201).json({ message: "Note added successfully", noteId: insertNote });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT
exports.updateNote = async (req, res) => {
    try {
        if('undefined' == typeof req.params.id){
            return res.status(400).json({ error: "id not found in request" });
        }
    
        if(!(/^\d+$/).test(req.params.id) || Number(req.params.id) < 1){
            return res.status(400).json({ error: "id should be positive integer" });
        }
        req.params.id = Number(req.params.id);
    
        let noteTitle = ('undefined' != typeof req.body.Title && 'string' == typeof req.body.Title && (req.body.Title).trim() != '') ? req.body.Title : null;
        let noteDescription = ('undefined' != typeof req.body.Description && 'string' == typeof req.body.Description) ? req.body.Description : null;
    
        if(noteTitle == null && noteDescription == null){
            return res.status(400).json({ error: "Title or Description not found in body" });
        }
    
        let selectQuery = await getRowDbData("select ID, Title, Description, created_at from notes_list where ID = ?", [req.params.id]);
    
        if('undefined' == typeof selectQuery || 'object' != typeof selectQuery){
            return res.status(404).json({ error: "Note not found" });
        }
    
        if(noteTitle != null){
            let checkTitle = await getRowDbData("select ID from notes_list where Title = ? and ID != ?", [noteTitle, req.params.id]);
            if('undefined' != typeof checkTitle){
                return res.status(409).json({ error: "Title already exists for another note" });
            }
        }
    
        if(noteTitle != null && noteDescription != null){
            await setDbData("update notes_list set Title = ?, Description = ? where ID = ?", [noteTitle, noteDescription, req.params.id]);
        }else if(noteTitle != null){
            await setDbData("update notes_list set Title = ? where ID = ?", [noteTitle, req.params.id]);
        }else{
            await setDbData("update notes_list set Description = ? where ID = ?", [noteDescription, req.params.id]);
        }
    
        return res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE
exports.deleteNote = async (req, res) => {
    try {
        if('undefined' == typeof req.params.id){
            return res.status(400).json({ error: "id not found in request" });
        }
        if(!(/^\d+$/).test(req.params.id) || Number(req.params.id) < 1){
            return res.status(400).json({ error: "id should be positive integer" });
        }
        req.params.id = Number(req.params.id);
    
        let existingNote = await getRowDbData("SELECT ID FROM notes_list WHERE ID = ?", [req.params.id]);
        if ('undefined' == typeof existingNote || !existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }
    
        await setDbData("delete from notes_list where ID = ?", [req.params.id]);
    
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

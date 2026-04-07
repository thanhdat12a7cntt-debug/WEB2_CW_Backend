import Help from "../Model/HelpModel.js";
export async function getAllHelp(_, res) {
    try {
        const helps = await Help.find().sort({ createdAt: -1 });
        res.status(200).json(helps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching help information' });
    }
}
export async function getAllHelpById(req, res) {
    try {
        const { id } = req.params;

        // check if id is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format!' });
        }

        const help = await Help.findById(id);

        if (!help) {
            return res.status(404).json({ message: 'Help information not found' });
        }

        res.status(200).json(help);
    } catch (error) {
        console.error("Lỗi Server:", error);
        res.status(500).json({ message: 'System Error', detail: error.message });
    }
}

export async function createHelp(req, res) {
    try {
        const { Key, Value, Category } = req.body;
        const newHelp = new Help({ Key, Value, Category });
        await newHelp.save();
        res.status(201).json(newHelp);
    } catch (error) {
        res.status(500).json({ message: 'Error creating help information' });
    }
}

export async function updateHelp(req, res) {
    try {
        const helpId = req.params.id;
        const { Key, Value, Category } = req.body;
        const updatedHelp = await Help.findByIdAndUpdate(helpId, { Key, Value, Category }, { new: true });
        res.status(200).json(updatedHelp);
    } catch (error) {
        res.status(500).json({ message: 'Error updating help information' });
    }
}

export async function deleteHelp(req, res) {
    try {
        const helpId = req.params.id;
        await Help.findByIdAndDelete(helpId);
        res.status(200).json({ message: `Help information with id ${helpId} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting help information' });
    }
}


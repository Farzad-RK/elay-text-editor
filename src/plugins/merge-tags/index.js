import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown ,addListToDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';


class MergeTags extends Plugin {

    constructor(editor) {
        super(editor);
        editor.config.define( "mergeTags", {
            options: [
                {
                    title: 'First name',
                    value: '%FIRST_NAME%'
                },
                {
                    title: 'Last name',
                    value: '%LAST_NAME%'
                },
                {
                    title: 'Consultant name',
                    value: '%CONSULTANT_NAME%'
                }
            ]
        } );
    }
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add( 'mergeTags', locale => {
            const dropdownView = createDropdown( locale );

            dropdownView.buttonView.set({
                label: 'Merge tags',
                withText: 'MergeTags',
                tooltip: false
            });

            const items = new Collection();
            const options = this.editor.config.get('mergeTags.options')
            options.forEach(option =>{
                items.add({
                    type: 'button',
                    model: new Model( {
                        withText: true,
                        value:option.value,
                        label: option.title
                    } )
                })
            })
            addListToDropdown( dropdownView, items );
            dropdownView.on( 'execute', (eventInfo) => {
                const { value } = eventInfo.source;
                editor.model.change( writer => {
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText( value, insertPosition );
                } );
                editor.editing.view.focus();
            } );
            return dropdownView
        })
    }
}
export default MergeTags

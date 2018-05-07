import React, {Component} from 'react';
import {render} from 'react-dom';
import { auth, db } from '../firebase';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span>::</span>); // This can be any component you want

const SortableItem = SortableElement(({value}) => {
    return (
        <li>
            <DragHandle />
            {value}
        </li>
    );
});

const SortableList = SortableContainer(({items}) => {
    if (!items){
        // window.location.reload();
    }
    return (
        <ul>
            {items.map((note,index) => (
                <SortableItem key={`item-${index}`} index={index} value={index+1+" "+note.text} />
            ))}
        </ul>
    );
}, {withRef: true});



class SortableComponent extends Component {
    state = {
        items: [],
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        const items = this.state.items;

        this.setState({
            items: arrayMove(items, oldIndex, newIndex),
        });
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.items !== this.state.items) {
            this.setState({items: nextProps.items
            });
        }
    }


    render() {
        console.log("in sortable conmp")
        console.log(this.props.items)
        // const {items} = this.props.items;
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true} />;
    }
}

export default SortableComponent;
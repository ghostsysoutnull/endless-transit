package com.endlesstransit.model

import groovy.transform.CompileStatic

/**
 * LazyLocusList: A Virtual Proxy for child location lists.
 * Automatically triggers ensureChildrenPopulated() on the owner container
 * upon the first interaction with the list.
 */
@CompileStatic
class LazyLocusList<E> implements List<E> {
    private final Container owner
    private final List<E> delegate = []

    LazyLocusList(Container owner) {
        this.owner = owner
    }

    /**
     * Ensures that the owner container has populated its children.
     */
    private void ensureAccessed() {
        if (!owner.childrenPopulated) {
            owner.ensureChildrenPopulated()
        }
    }

    // --- List Implementation Methods ---

    @Override int size() { ensureAccessed(); delegate.size() }
    @Override boolean isEmpty() { ensureAccessed(); delegate.isEmpty() }
    @Override boolean contains(Object o) { ensureAccessed(); delegate.contains(o) }
    @Override Iterator<E> iterator() { ensureAccessed(); delegate.iterator() }
    @Override Object[] toArray() { ensureAccessed(); delegate.toArray() }
    @Override <T> T[] toArray(T[] a) { ensureAccessed(); delegate.toArray(a) }
    
    @Override boolean add(E e) { 
        // We DO NOT trigger lazy load on add, because add is typically 
        // called DURING the population process.
        delegate.add(e) 
    } 
    
    @Override boolean remove(Object o) { ensureAccessed(); delegate.remove(o) }
    @Override boolean containsAll(Collection<?> c) { ensureAccessed(); delegate.containsAll(c) }
    @Override boolean addAll(Collection<? extends E> c) { delegate.addAll(c) }
    @Override boolean addAll(int index, Collection<? extends E> c) { ensureAccessed(); delegate.addAll(index, c) }
    @Override boolean removeAll(Collection<?> c) { ensureAccessed(); delegate.removeAll(c) }
    @Override boolean retainAll(Collection<?> c) { ensureAccessed(); delegate.retainAll(c) }
    @Override void clear() { delegate.clear() }
    
    @Override E get(int index) { ensureAccessed(); delegate.get(index) }
    @Override E set(int index, E element) { ensureAccessed(); delegate.set(index, element) }
    @Override void add(int index, E element) { delegate.add(index, element) }
    @Override E remove(int index) { ensureAccessed(); delegate.remove(index) }
    @Override int indexOf(Object o) { ensureAccessed(); delegate.indexOf(o) }
    @Override int lastIndexOf(Object o) { ensureAccessed(); delegate.lastIndexOf(o) }
    @Override ListIterator<E> listIterator() { ensureAccessed(); delegate.listIterator() }
    @Override ListIterator<E> listIterator(int index) { ensureAccessed(); delegate.listIterator(index) }
    @Override List<E> subList(int fromIndex, int toIndex) { ensureAccessed(); delegate.subList(fromIndex, toIndex) }

    // Groovy-specific method for '<<' operator
    boolean leftShift(E e) {
        return delegate.add(e)
    }
}

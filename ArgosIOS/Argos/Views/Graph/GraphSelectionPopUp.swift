//
//  GraphPopUp.swift
//  Argos
//
//  Created by Peyton McKee on 12/20/23.
//

import SwiftUI

struct GraphSelectionPopUp : View {
    @State private var nodes = [Node]()
    @State private var isPresented: Bool = false
    @EnvironmentObject var errorHandling: ErrorHandling
    
    var selectDataType : (_ dataType: DataType) -> Void

    var body: some View {
        VStack (spacing: 0) {
            HStack {
                ArgosLabel("Select Data Type")
                    .onTapGesture {
                        self.present()
                    }
                    .background(Color(.systemBackground))
                    .clipShape(.buttonBorder)
            } 
            .frame(maxWidth: .infinity, alignment: .leading)
            if (self.isPresented) {
                HorizontalExpandingScrollView(items: self.nodes.map({
                    ScrollViewItem(name: $0.name, subItems: $0.dataTypes.map({
                        dataType in
                        ScrollViewSubItem(name: dataType.name, onSelect: {
                            withAnimation {
                                self.selectDataType(dataType)
                                self.isPresented.toggle()
                            }
                        })
                    }))
                }))
            }
        }
        
        .onAppear {
            print("pop \(isPresented)")
            APIHandler.shared.getAllNodes(completion: {
                result in
                do {
                    let nodes = try result.get()
                    DispatchQueue.main.async {
                        self.nodes = nodes
                    }
                } catch {
                    DispatchQueue.main.async {
                        self.errorHandling.handle(error: error)
                    }
                }
            })
        }
    }
    
    private func present() {
        withAnimation {
            self.isPresented.toggle()
        }
    }
    
}

#Preview {
    GraphSelectionPopUp(selectDataType: {_ in})
}

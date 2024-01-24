//
//  LandingView.swift
//  Argos
//
//  Created by Northeastern Electric Racing on 12/17/23.
//

import SwiftUI

struct LandingView: View {
    @EnvironmentObject private var errorHandling: ErrorHandling
    
    @ObservedObject private var socketClient = SocketClient.shared
    @ObservedObject private var viewModel = LandingViewModel()
    
    var body: some View {
        AsyncContentView(source: viewModel) { props in
            NavigationStack {
                VStack {
                    if self.socketClient.isConnected {
                        ArgosHeader("Connected To Router")
                            .multilineTextAlignment(.center)
                    } else {
                        ArgosHeader("Not Connected To Router")
                            .multilineTextAlignment(.center)
                    }
                    BatteryView(progress: .constant(self.viewModel.stateOfCharge), fill: .green, outline: .secondary, direction: .horizontal)
                    HStack {
                        ThermometerView(current: self.viewModel.packTemp, minimum: -15, maximum: 60, label: "Pack").frame(maxWidth: .infinity)
                        ThermometerView(current: self.viewModel.motorTemp, minimum: -15, maximum: 60, label: "Motor").frame(maxWidth: .infinity)
                    }
                    HStack {
                        ArgosButton(title: "Historical", action: {
                            self.viewModel.dialogPresentation.show(content: .carousel(runs: props.runs, selectRun: self.viewModel.selectRun, isPresented: self.$viewModel.dialogPresentation.isPresented))
                        })
                        
                        ArgosButton(title: "More Details", action: {
                            self.viewModel.onMoreDetailsClicked()
                        })
                    }
                }
                .padding()
                .navigationTitle("Argos")
                .customDialog(presentationManger: self.viewModel.dialogPresentation)
                .navigationDestination(isPresented: self.$viewModel.showGraph) {
                    if let selectedRunId = self.viewModel.selectedRunId {
                        GraphContainer(viewModel: .init(runId: selectedRunId))
                    }
                }
            }
        }
    }
    
}

#Preview {
    LandingView()
}
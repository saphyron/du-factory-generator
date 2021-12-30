import * as React from "react"
import { Button, Row, Col, InputNumber } from "antd"
import { Talent, TalentSubject } from "../talents"
import { FactoryGraph } from "../graph"
import { FactoryState } from "./factory"

/**
 * Properties of the FactoryTalents component
 */
interface FactoryTalentsProps {
    /**
     * Set the parent NewFactory state
     * @param state parent component state
     */
    setFactoryState: (state: FactoryState) => void

    // factory talents and levels
    talents: { [key: string]: Talent }
    talentLevels: { [key: string]: number }

    /**
     * Set the level for a given talent
     */
    setTalentLevels: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>

    // the current FactoryGraph
    factory: FactoryGraph | undefined

    /**
     * Set the factory graph
     * @param factory the FactoryGraph
     */
    setFactory: (factory: FactoryGraph) => void
}

/**
 * Set talent levels
 * @param props {@link FactoryTalentsProps}
 */
export function FactoryTalents(props: FactoryTalentsProps) {
    return (
        <React.Fragment>
            <h2>Set talent levels:</h2>
            <Row>
                <Col span={6}>Talent</Col>
                <Col span={3}>Level</Col>
            </Row>
            {Object.keys(props.talents).map(function (talent) {
                // handle update of talent level state
                const setTalentLevels = (value: number) => {
                    props.setTalentLevels((prevState: { [key: string]: number }) => ({
                        ...prevState,
                        [talent]: value,
                    }))
                }
                return (
                    <React.Fragment key={talent}>
                        <MemorizedFactoryTalentsRow
                            setTalentLevels={setTalentLevels}
                            talent={props.talents[talent]}
                            value={props.talentLevels[talent] || 0}
                        />
                    </React.Fragment>
                )
            })}
            <Button
                type="primary"
                onClick={() => {
                    props.setFactoryState(FactoryState.SELECT)
                }}
            >
                Next
            </Button>
        </React.Fragment>
    )
}

/**
 * Properties of the FactoryTalentRow
 */
interface FactoryTalentRowProps {
    setTalentLevels: (value: number) => void
    talent: Talent
    value: number
}

/**
 * Single row of the talent table
 */
function FactoryTalentsRow(props: FactoryTalentRowProps) {
    return (
        <Row>
            <Col span={6}>
                <label>{props.talent.name}</label>
            </Col>
            <Col span={3}>
                <InputNumber
                    min={0}
                    max={5}
                    value={props.value}
                    onChange={(value: string | number | undefined) =>
                        props.setTalentLevels(Number(value))
                    }
                />
            </Col>
        </Row>
    )
}
function sameRow(oldProps: FactoryTalentRowProps, newProps: FactoryTalentRowProps) {
    return oldProps.value === newProps.value
}
const MemorizedFactoryTalentsRow = React.memo(FactoryTalentsRow, sameRow)
